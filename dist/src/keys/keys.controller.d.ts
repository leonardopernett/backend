import { KeysService } from './keys.service';
export declare class KeysController {
    private key;
    constructor(key: KeysService);
    postNews(body: any): Promise<void>;
}
