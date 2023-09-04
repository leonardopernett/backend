import { copyFile } from "fs";

class helper{
    public combine(obj:any,obj2:any):any{
        return { ...obj2 ,...obj }
    }    

    public async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }

    }
}

export const help = new helper();