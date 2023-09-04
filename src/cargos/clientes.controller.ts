import { Controller, UseGuards, Get, Param, UseInterceptors } from '@nestjs/common';

@Controller('api/clientes')
export class ClientesController {

    constructor(
      
    ){  }

    @Get('all/directors')
    getClientDirectors(){
        return true;
    }

    // @UseGuards(JwtGuard)
    // @Get(':idCliente/directors')
    // async getClientDirectors(
    //     @Param('idCliente') idCliente: string,
    //     @User() user: U
    // ): Promise<any> {
    //     return this.cargosModel.getClientDirectors(idCliente, user.sub)
    // }
}