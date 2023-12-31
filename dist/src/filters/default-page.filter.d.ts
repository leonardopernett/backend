import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class DefaultPageFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): HttpException;
}
