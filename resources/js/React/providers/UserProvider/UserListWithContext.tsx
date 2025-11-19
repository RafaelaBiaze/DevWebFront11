import { useEffect } from "react";
import { UserListWithContextProps } from "./UserList.types";
import { useUsersContext } from "../../providers/UserProvider/usersHooks";
import userListApi from "../../../services/api/userListApi";

export default function UserListWithContext({ className }: UserListWithContextProps) {

    const { state, changeData, setLoading } = useUsersContext();

    useEffect(() => {
        loadUsers();
    }, [state.currentPage]);

    const loadUsers = async () => {
        setLoading(true);
        const result = await userListApi(state.currentPage);
        changeData(result);
    };

    if (state.loading) {
        return (
            <div className={`d-flex justify-content-center ${className || ""}`}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        );
    }

    if (state.data === "error") {
        return (
            <div className={`alert alert-danger ${className || ""}`}>
                Erro ao carregar usuários. Tente novamente.
            </div>
        );
    }

    if (!state.data || state.data.rows.length === 0) {
        return (
            <div className={`alert alert-info ${className || ""}`}>
                Nenhum usuário encontrado.
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="row">
                <div className="col-12">
                    <h3>Lista de Usuários</h3>
                    <p>Total: {state.data.count} usuários | Página {state.data.page} de {state.data.totalPages}</p>
                </div>
            </div>
            
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Criado em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.data.rows.map((user) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.photo ? (
                                        <img 
                                            src={user.photo} 
                                            alt={`Foto de ${user.name}`}
                                            className="rounded-circle"
                                            width="40"
                                            height="40"
                                        />
                                    ) : (
                                        <span className="text-muted">Sem foto</span>
                                    )}
                                </td>
                                <td>{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}