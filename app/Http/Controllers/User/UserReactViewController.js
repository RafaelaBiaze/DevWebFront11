import UserModel from "../../../Models/UserModel.js";

export default async function UserReactViewController(req, res) {
    try {
        // Buscar todos os usuários para estatísticas
        const users = await UserModel.findAll({
            attributes: ['id', 'name', 'email', 'photo', 'created_at'],
            order: [['created_at', 'DESC']]
        });

        // Renderizar a view com React
        res.render('users-react', {
            user: req.user, // Usuário logado (vem do middleware JWT)
            users: users,   // Lista de usuários para estatísticas se necessário
            title: 'Usuários - React Provider'
        });

    } catch (error) {
        console.error('Erro ao carregar página de usuários React:', error);
        res.status(500).render('error', {
            message: 'Erro interno do servidor',
            error: error
        });
    }
}