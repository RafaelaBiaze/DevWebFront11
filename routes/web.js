import { Router } from 'express';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import ListPublicFilesController from '../app/Http/Controllers/ListPublicFilesController.js';
import swaggerGenerate from '../Core/SwaggerCore/swaggerGenerate.js';
import UserViewController from '../app/Http/Controllers/User/UserViewController.js';
import UserReactViewController from '../app/Http/Controllers/User/UserReactViewController.js';
import JwtVerifyViewMiddleware from '../app/Http/Middlewares/JwtVerifyViewMiddleware.js';
import ViewProductController from '../app/Http/Controllers/Product/ViewProductController.js';
import ViewExampleController from '../app/Http/Controllers/ViewExampleController.js';

export default (function () {

    const router = Router();

    router.get('/users', JwtVerifyViewMiddleware, UserViewController);
    
    // Nova rota para testar o Provider React
    router.get('/users-react', JwtVerifyViewMiddleware, UserReactViewController);

    router.get('/products', JwtVerifyViewMiddleware, ViewProductController);

    router.get('/examples', JwtVerifyViewMiddleware, ViewExampleController);

    /** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Rota para listar arquivos na pasta 'public'
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.get('/', ListPublicFilesController);

    // Documentação Swagger
    router.use('/docs', swaggerUi.serve, swaggerGenerate);


    return router;

})();