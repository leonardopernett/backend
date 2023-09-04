"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreturnoModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
let PreturnoModelService = class PreturnoModelService {
    constructor(db) {
        this.db = db;
    }
    async insertarpreturno(data) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [data.cedula]);
        let resp = await this.db.NIK(`insert into preturno 
               (titulo, descripcion, contenido ,fecha_inicial, fecha_final,validar_multiple,validar_unica,validar_concepto,tipo_preturno,creador) values (?,?,?,?,?,?,?,?,?,?) `, [
            data.preturnotitulo,
            data.preturnodescripcion,
            data.preturnocontenido,
            data.fechainicial,
            data.fechafinal,
            data.validarmultiple,
            data.validarunico,
            data.validarconcepto,
            data.tipopreturno,
            dato.id
        ]);
        if (data.tipopreturno == 1) {
            let array = data.pcrcList.map(item => [resp.insertId, item]);
            await this.db.nikcleanPoolConection.query('INSERT INTO preturno_pcrcs (id_preturno,pcrc) VALUES ?', [array]);
            return resp;
        }
        if (data.tipopreturno == 2) {
            let array = data.personasList.map(item => [resp.insertId, item]);
            await this.db.nikcleanPoolConection.query('INSERT INTO acargo_usuario_preturno (id_preturno,cedula) VALUES ?', [array]);
            return resp;
        }
    }
    async notificarpreturno(tokencosmo, tipo, titulo, array) {
        let nombretipo;
        let usuarios_red;
        if (tipo == 1) {
            let nuevoarray = array.map(item => item[1]);
            let data = await this.db.nikcleanPoolConection.query(`SELECT a.documento FROM usuario_base a WHERE a.base_id IN (${nuevoarray.toString()})`);
            let arrayusuariored = data[0].map(item => item.documento);
            let usuario_red = await this.db.JARVIS(`SELECT a.usuario_red FROM dp_usuarios_red a WHERE a.documento IN (${arrayusuariored.toString()})`);
            usuarios_red = usuario_red.map((item) => item.usuario_red);
            nombretipo = "Aprendizaje Agil";
        }
        if (tipo == 2) {
            nombretipo = "Preturno";
            let nuevoarray = array.map(item => item[1]);
            let usuario_red = await this.db.JARVIS(`SELECT a.usuario_red FROM dp_usuarios_red a WHERE a.documento IN (${nuevoarray.toString()})`);
            usuarios_red = usuario_red.map((item) => item.usuario_red);
        }
        var axios = require('axios');
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        var data = {
            "notification": {
                "pattern": "username",
                "target": usuarios_red,
                "notification_config": {
                    "title": nombretipo,
                    "text": titulo,
                    "position": 3,
                    "width": 400,
                    "height": 200,
                    "resizable": true,
                    "allow_close": true,
                    "movable": true,
                    "dark_mode": true,
                    "context": "info",
                    "buttons": [
                        {
                            "context": "info",
                            "url": "http://localhost:4200/#/app/preturnos",
                            "label": "Click aqui !",
                            "block": true,
                            "browser": "chrome"
                        }
                    ]
                }
            }
        };
        var config = {
            httpsAgent: agent,
            method: 'post',
            url: 'https://172.102.180.192:3000/api/send_notification',
            headers: {
                'Authorization': 'Bearer ' + tokencosmo,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    async asignarTokenCosmos() {
        const axios = require('axios');
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        const data = JSON.stringify({
            "user": "nick.application",
            "pw": "cdf81e9980f6bfebfb476ebd75a5153e0b604f59b93206cd"
        });
        const config = {
            httpsAgent: agent,
            method: 'post',
            url: 'https://jarvis.grupokonecta.local/jarvis_api/index.php/Auth/generateTokenApp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            const response = await axios(config);
            return response.data.payload.accesstoken;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async mostrarpreturnos(pcrc) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT 
          a.id_preturno,
          a.titulo,
          a.descripcion,
          a.contenido,
          a.fecha_creado,
          a.fecha_modificado,
          DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),
          DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),
          a.validar_multiple,
          a.validar_unica,
          a.validar_concepto,
          DATEDIFF(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR), NOW()) AS fecha_restante
          FROM preturno a
          JOIN preturno_pcrcs b ON b.id_preturno=a.id_preturno
          WHERE 
          DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN DATE_FORMAT(DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),'%Y-%m-%d') 
          AND DATE_FORMAT(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),'%Y-%m-%d')
          AND b.pcrc=?
          AND a.borrado=0
          AND a.tipo_preturno=1`, [pcrc]);
        return data;
    }
    async mostrarpreturnosacargo(cedula) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT 
          a.id_preturno,
          a.titulo,
          a.descripcion,
          a.contenido,
          a.fecha_creado,
          a.fecha_modificado,
          DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),
          DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),
          a.validar_multiple,
          a.validar_unica,
          a.validar_concepto,
          DATEDIFF(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR), NOW()) AS fecha_restante
          FROM preturno a
          JOIN acargo_usuario_preturno c ON c.id_preturno=a.id_preturno
          WHERE 
          DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN DATE_FORMAT(DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),'%Y-%m-%d') 
          AND DATE_FORMAT(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),'%Y-%m-%d')
          AND a.borrado=0
          AND a.tipo_preturno=2
          AND c.cedula=?`, [cedula]);
        return data;
    }
    async mostrarpreturnosadmin(cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT * FROM preturno a
          WHERE a.borrado=0 AND a.creador=?`, [dato.id]);
        return data;
    }
    async borrarpreturno(idpreturno) {
        let [data] = await this.db.nikcleanPoolConection.query(`
            UPDATE preturno SET borrado = 1 WHERE id_preturno=?`, [
            idpreturno
        ]);
        return data;
    }
    async actualizarpreturno(idpreturno, titulo, descripcion, contenido, fecha_inicial, fecha_final) {
        let [data] = await this.db.nikcleanPoolConection.query(`
            UPDATE preturno SET titulo = ?,descripcion=?,contenido=?,fecha_inicial=?,fecha_final=? WHERE id_preturno=?`, [
            titulo, descripcion, contenido, fecha_inicial, fecha_final, idpreturno
        ]);
        return data;
    }
    async guardarPreguntas(idobligatorio, preguntas, respuestas) {
        let preguntasFinal = preguntas.filter(Boolean);
        for (let index = 0; index < preguntasFinal.length; index++) {
            let RespuestasFinal = respuestas[index].filter(Boolean);
            let data = await this.db.nikcleanPoolConection.query('INSERT INTO pregunta_preturno (pregunta,id_preturno) VALUES (?,?)', [preguntasFinal[index], idobligatorio]);
            for (let i = 0; i < RespuestasFinal.length; i++) {
                if (i == 0) {
                    await this.db.nikcleanPoolConection.query('INSERT INTO respuestas_preturno (respuestas,valida,id_pregunta) VALUES (?,?,?)', [RespuestasFinal[i], 1, data[0].insertId]);
                }
                if (i != 0) {
                    await this.db.nikcleanPoolConection.query('INSERT INTO respuestas_preturno (respuestas,valida,id_pregunta) VALUES (?,?,?)', [RespuestasFinal[i], 0, data[0].insertId]);
                }
            }
        }
    }
    async guardarConcepto(idpreturno, preguntas, respuestas) {
        for (const [index, element1] of preguntas.entries()) {
            const data = await this.db.nikcleanPoolConection.query('INSERT INTO pregunta_concepto_preturno (pregunta,id_preturno) VALUES (?,?)', [element1, idpreturno]);
            if (index < respuestas.length) {
                const element2 = respuestas[index];
                await this.db.nikcleanPoolConection.query('INSERT INTO respuestas_concepto_preturno (respuestas,id_pregunta) VALUES (?,?)', [element2, data[0].insertId]);
            }
        }
    }
    async guardarPreguntasUnicas(idpreturno, preguntas, respuestas) {
        let preguntasFinal = preguntas.filter(Boolean);
        for (let index = 0; index < preguntasFinal.length; index++) {
            let RespuestasFinal = respuestas[index].filter(Boolean);
            let data = await this.db.nikcleanPoolConection.query('INSERT INTO pregunta_unica_preturno (pregunta,id_preturno) VALUES (?,?)', [preguntasFinal[index], idpreturno]);
            for (let i = 0; i < RespuestasFinal.length; i++) {
                await this.db.nikcleanPoolConection.query('INSERT INTO respuestas_unicas_preturno (respuestas,id_pregunta) VALUES (?,?)', [RespuestasFinal[i], data[0].insertId]);
            }
        }
    }
    async validarPreturnoTotal(pcrc, cedula) {
        let contador = 0;
        let [[idusuario]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let contar = [];
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT 
          a.id_preturno
          FROM preturno a
          JOIN preturno_pcrcs b ON b.id_preturno=a.id_preturno
          WHERE 
          DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN DATE_FORMAT(DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),'%Y-%m-%d') 
          AND DATE_FORMAT(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),'%Y-%m-%d')
          AND b.pcrc=?
          AND a.borrado=0
          AND a.tipo_preturno=1`, [pcrc]);
        data.forEach(element => {
            contar.push(element.id_preturno);
        });
        for (const element of contar) {
            let data = await this.db.NIK(`call preturno_validado(?,?)`, [idusuario.id, element]);
            if (data == undefined) {
                contador++;
            }
            else {
            }
        }
        return contador;
    }
    async totalcargo(cedula) {
        let contador = 0;
        let [[idusuario]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let contar = [];
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT 
      a.id_preturno
      FROM preturno a
      JOIN acargo_usuario_preturno c ON c.id_preturno=a.id_preturno
      WHERE 
      DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN DATE_FORMAT(DATE_ADD(a.fecha_inicial, INTERVAL -5 HOUR),'%Y-%m-%d') 
      AND DATE_FORMAT(DATE_ADD(a.fecha_final, INTERVAL -5 HOUR),'%Y-%m-%d')
      AND a.borrado=0
      AND a.tipo_preturno=2
      AND c.cedula=?`, [cedula]);
        data.forEach(element => {
            contar.push(element.id_preturno);
        });
        for (const element of contar) {
            let data = await this.db.NIK(`call preturno_validado(?,?)`, [idusuario.id, element]);
            if (data == undefined) {
                contador++;
            }
            else {
            }
        }
        return contador;
    }
    async obtenerPreguntasPreturno(id) {
        let data = await this.db.NIK(`SELECT * FROM pregunta_preturno a
        JOIN respuestas_preturno b ON a.id_pregunta=b.id_pregunta
        WHERE a.id_preturno=?`, [id]);
        return data;
    }
    async obtenerPreguntasPreturnoUnica(id) {
        let data = await this.db.NIK(`SELECT * FROM pregunta_unica_preturno a
      JOIN respuestas_unicas_preturno b ON a.id_pregunta=b.id_pregunta
      WHERE a.id_preturno=?`, [id]);
        return data;
    }
    async obtenerPreguntasPreturnoConcepto(id) {
        let data = await this.db.NIK(`SELECT * FROM pregunta_concepto_preturno a
    WHERE a.id_preturno=?`, [id]);
        return data;
    }
    async obtenerRespuestaPreturnoConcepto(id) {
        let data = await this.db.NIK(`SELECT * FROM respuestas_concepto_preturno a
  WHERE a.id_pregunta=?`, [id]);
        return data;
    }
    async guardarResultadoMultiple(id_preturno, cedula, porcentaje1, porcentaje2, porcentaje3) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let resultado = await this.db.nikcleanPoolConection.query(`SELECT a.intentos FROM respuesta_resultados_preturno a
      WHERE a.id_usuario=? AND a.id_preturno=?
      ORDER BY a.id_respuesta_resultado_preturno DESC LIMIT 1`, [dato.id, id_preturno]);
        if (resultado[0].length == 0) {
            this.db.nikcleanPoolConection.query('INSERT INTO respuesta_resultados_preturno (id_usuario,porcentaje_multiple,porcentaje_unico,porcentaje_concepto,intentos,id_preturno) VALUES (?,?,?,?,?,?)', [dato.id, porcentaje1, porcentaje2, porcentaje3, 1, id_preturno]);
        }
        else {
            this.db.nikcleanPoolConection.query('INSERT INTO respuesta_resultados_preturno (id_usuario,porcentaje_multiple,porcentaje_unico,porcentaje_concepto,intentos,id_preturno) VALUES (?,?,?,?,?,?)', [dato.id, porcentaje1, porcentaje2, porcentaje3, resultado[0][0].intentos + 1, id_preturno]);
        }
    }
    async guardarCuestionarioMultiple(id_preturno, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        await this.db.nikcleanPoolConection.query('INSERT INTO multiple_preturno (id_usuario,id_preturno) VALUES (?,?)', [data.id, id_preturno]);
    }
    async guardarCuestionarioUnico(id_preturno, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        await this.db.nikcleanPoolConection.query('INSERT INTO unico_preturno (id_usuario,id_preturno) VALUES (?,?)', [data.id, id_preturno]);
    }
    async guardarCuestionarioConcepto(id_preturno, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        await this.db.nikcleanPoolConection.query('INSERT INTO concepto_preturno (id_usuario,id_preturno) VALUES (?,?)', [data.id, id_preturno]);
    }
    async validarRespuestasMultiple(respuestas) {
        let totalrespuestas = respuestas.length;
        let data = await this.db.NIK('SELECT COUNT(*) as validar FROM respuestas_preturno a WHERE a.id_respuestas IN (' + respuestas.join() + ') AND a.valida=1 ');
        if (data[0].validar == totalrespuestas) {
            return { validar: 0, validas: data[0].validar, total: respuestas.length };
        }
        else {
            return { validar: 1, validas: data[0].validar, total: respuestas.length };
        }
    }
    async vistoMultiple(id_preturno, cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`SELECT id FROM multiple_preturno a 
  WHERE a.id_usuario=? AND id_preturno=?`, [dato.id, id_preturno]);
        if (data.length == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async vistoUnico(id_preturno, cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`SELECT id FROM unico_preturno a 
  WHERE a.id_usuario=? AND id_preturno=?`, [dato.id, id_preturno]);
        if (data.length == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async vistoConcepto(id_preturno, cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`SELECT id FROM concepto_preturno a 
  WHERE a.id_usuario=? AND id_preturno=?`, [dato.id, id_preturno]);
        if (data.length == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async guardarVisto(id_preturno, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        await this.db.nikcleanPoolConection.query('INSERT INTO validar_preturno (id_usuario,id_preturno) VALUES (?,?)', [data.id, id_preturno]);
    }
    async visto(id_preturno, cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`SELECT id FROM validar_preturno a 
  WHERE a.id_usuario=? AND id_preturno=?`, [dato.id, id_preturno]);
        if (data.length == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async validadoOcultar(cedula, id_preturno) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`call preturno_validado(?,?)`, [dato.id, id_preturno]);
        if (data == undefined) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async avance(cedula, pcrc) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.NIK(`SELECT
    (
    (
	 (SELECT COUNT(*) FROM validar_preturno a JOIN preturno_pcrcs n ON a.id_preturno=n.id_preturno JOIN preturno p ON p.id_preturno=n.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=1)
	 +(SELECT COUNT(*) FROM multiple_preturno a JOIN preturno_pcrcs n ON a.id_preturno=n.id_preturno JOIN preturno p ON p.id_preturno=n.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=1)
	 +(SELECT COUNT(*) FROM unico_preturno e JOIN preturno_pcrcs n ON e.id_preturno=n.id_preturno JOIN preturno p ON p.id_preturno=n.id_preturno WHERE e.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=1)
   +(SELECT COUNT(*) FROM concepto_preturno e JOIN preturno_pcrcs n ON e.id_preturno=n.id_preturno JOIN preturno p ON p.id_preturno=n.id_preturno WHERE e.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=1)
	 )
    /
    (SELECT 
      (
      SUM(b.validar_unica)
      +SUM(b.validar_multiple)
      +SUM(b.validar_concepto)
      +(SELECT COUNT(*) FROM preturno k 
      JOIN preturno_pcrcs u ON u.id_preturno=k.id_preturno
      WHERE k.validar_multiple=0 AND k.validar_unica=0 AND k.validar_concepto=0 AND k.borrado=0 AND k.tipo_preturno=1)
      ) AS total FROM preturno b 
      JOIN preturno_pcrcs c ON b.id_preturno=c.id_preturno
		WHERE b.borrado=0 AND b.tipo_preturno=1)*100
    ) AS avance`, [dato.id, dato.id, dato.id, dato.id]);
        let data2 = await this.db.NIK(`
    SELECT
    (
    (
	 (SELECT COUNT(*) FROM validar_preturno a JOIN preturno p ON p.id_preturno=a.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=2)
	 +(SELECT COUNT(*) FROM multiple_preturno a JOIN preturno p ON p.id_preturno=a.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=2)
	 +(SELECT COUNT(*) FROM unico_preturno a JOIN preturno p ON p.id_preturno=a.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=2)
   +(SELECT COUNT(*) FROM concepto_preturno a JOIN preturno p ON p.id_preturno=a.id_preturno WHERE a.id_usuario=? AND p.borrado=0 AND p.tipo_preturno=2)
	 )
    /
    (SELECT 
      (
      SUM(b.validar_unica)
      +SUM(b.validar_multiple)
      +SUM(b.validar_concepto)
      +(SELECT COUNT(*) FROM preturno k 
      JOIN acargo_usuario_preturno f ON f.id_preturno=k.id_preturno
      WHERE k.validar_multiple=0 AND k.validar_unica=0 AND k.validar_concepto=0 AND k.borrado=0 AND k.tipo_preturno=2 AND f.cedula=?)
      ) AS total FROM preturno b 
      JOIN acargo_usuario_preturno f ON f.id_preturno=b.id_preturno
		WHERE b.borrado=0 AND b.tipo_preturno=2 AND f.cedula=?)*100
    ) AS avance
    `, [dato.id, dato.id, dato.id, dato.id, cedula, cedula]);
        if (data[0].avance == null || data2[0].avance == null) {
            let avance = (Number(data[0].avance) + Number(data2[0].avance));
            return avance;
        }
        else {
            let avance = (Number(data[0].avance) + Number(data2[0].avance)) / 2;
            return avance;
        }
    }
    async getReportPreturnoPcrc(pcrc, fechaini, fechafin, limite, page) {
        let data = await this.db.NIK(`SELECT b.id_preturno,b.titulo,c.fecha_respuesta,d.documento,d.user_name,c.porcentaje_multiple,c.porcentaje_unico,c.porcentaje_concepto,c.intentos FROM preturno_pcrcs a
    JOIN preturno b ON a.id_preturno=b.id_preturno
    JOIN respuesta_resultados_preturno c ON c.id_preturno=a.id_preturno
    JOIN usuario d ON d.id=c.id_usuario
    WHERE DATE_FORMAT(b.fecha_creado,'%Y/%m/%d') BETWEEN ? AND ? AND a.pcrc=? 
    LIMIT ? OFFSET ?`, [fechaini, fechafin, pcrc, limite, page]);
        return data;
    }
    async getPreturnoTotal(ini, fin, idpcrc) {
        const limite = 5;
        const limite2 = 100000;
        let result = await this.db.NIKSLAVE(`
    SELECT COUNT(*) AS total_preturno FROM preturno_pcrcs a
    JOIN preturno b ON a.id_preturno=b.id_preturno
    JOIN respuesta_resultados_preturno c ON c.id_preturno=a.id_preturno
    JOIN usuario d ON d.id=c.id_usuario
    WHERE DATE_FORMAT(b.fecha_creado,'%Y/%m/%d') BETWEEN ? AND ? 
    AND a.pcrc=?`, [ini, fin, idpcrc]);
        let data = await this.Paginatotal(result[0].total_preturno, limite);
        let data2 = await this.Paginatotalexcel(result[0].total_preturno, limite2);
        return { "total_preturno": data, "total_exportar": data2 };
    }
    async getReportPreturnoLimit(ini, fin, idpcrc, limite, pag) {
        let result = await this.db.NIKSLAVE(`
  SELECT b.id_preturno,b.titulo,c.fecha_respuesta,d.documento,d.user_name,c.porcentaje_multiple,c.porcentaje_unico,c.porcentaje_concepto,c.intentos FROM preturno_pcrcs a
    JOIN preturno b ON a.id_preturno=b.id_preturno
    JOIN respuesta_resultados_preturno c ON c.id_preturno=a.id_preturno
    JOIN usuario d ON d.id=c.id_usuario
    WHERE DATE_FORMAT(b.fecha_creado,'%Y/%m/%d') BETWEEN ? AND ? AND a.pcrc=? 
    LIMIT ? OFFSET ?`, [ini, fin, idpcrc, limite, pag]);
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'ID', key: 'id_preturno' },
            { header: 'Título', key: 'titulo' },
            { header: 'Fecha Respuesta', key: 'fecha_respuesta' },
            { header: 'Cédula', key: 'documento' },
            { header: 'Nombre', key: 'user_name' },
            { header: 'Porcentaje Multiple', key: 'porcentaje_multiple' },
            { header: 'Porcentaje Unico', key: 'porcentaje_unico' },
            { header: 'Porcentaje Concepto', key: 'porcentaje_concepto' },
            { header: 'Intentos', key: 'intentos' }
        ];
        worksheet.addRows(result);
        return await workbook.xlsx.writeBuffer();
    }
    async Paginatotalexcel(total_exportar, limite) {
        let numeroexportar = [];
        if (Number.isInteger(total_exportar / limite)) {
            for (var i = 1; i <= total_exportar / limite; i++) {
                numeroexportar.push(i);
            }
            return numeroexportar;
        }
        else {
            let num;
            num = parseFloat(total_exportar) / limite + 0.5;
            num = Math.round(num);
            num = Number(num.toFixed(0));
            for (var i = 1; i <= num; i++) {
                numeroexportar.push(i);
            }
            return numeroexportar;
        }
    }
    async Paginatotal(total_lecturas, limite) {
        if (Number.isInteger(total_lecturas / limite)) {
            return total_lecturas / limite;
        }
        else {
            let num;
            num = parseFloat(total_lecturas) / limite + 0.5;
            num = Math.round(num);
            num = Number(num.toFixed(0));
            return num;
        }
    }
    async aprobacion(cedula) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let [data] = await this.db.NIK(`SELECT
    (
    (SELECT SUM(coalesce(porcentaje,0))+SUM(coalesce(porcentaje2,0))+SUM(coalesce(porcentaje3,0)) AS suma FROM (SELECT a.id_preturno,MAX(a.porcentaje_multiple) AS porcentaje,MAX(a.porcentaje_unico) AS porcentaje2,MAX(a.porcentaje_concepto) AS porcentaje3 FROM respuesta_resultados_preturno a JOIN preturno b ON b.id_preturno=a.id_preturno WHERE a.id_usuario=? AND b.borrado=0 GROUP BY a.id_preturno) b)
    /
    (SELECT SUM(total1)+SUM(total2)+SUM(total3) AS suma FROM(SELECT MAX(n.validar_multiple) AS total1,MAX(n.validar_unica) AS total2,MAX(n.validar_concepto) AS total3 FROM respuesta_resultados_preturno b JOIN preturno n ON n.id_preturno=b.id_preturno  WHERE b.id_usuario=? AND n.borrado=0 GROUP BY b.id_preturno)k)
    
    ) AS avance
    `, [dato.id, dato.id]);
        return data;
    }
    async personasAcargo(cedula) {
        let data = await this.db.JARVIS(`SELECT a.documento,b.nombre_completo FROM dp_distribucion_personal a 
    JOIN dp_datos_generales b ON b.documento=a.documento
    WHERE a.documento_jefe=? AND a.fecha_actual=DATE_ADD(CURDATE(), INTERVAL -DAY(CURDATE())+1 DAY)
    `, [cedula]);
        return data;
    }
};
PreturnoModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], PreturnoModelService);
exports.PreturnoModelService = PreturnoModelService;
//# sourceMappingURL=preturno-model.service.js.map