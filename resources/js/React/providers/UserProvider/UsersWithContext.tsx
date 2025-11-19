import UsersProvider from "../../providers/UserProvider/UsersProvider";
import UserListWithContext from "../../components/UserList/UserListWithContext";
import UserPaginationWithContext from "../../components/UserPagination/UserPaginationWithContext";

export default function UsersWithContext() {
    return (
        <UsersProvider>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white">
                                <h2 className="card-title mb-0">
                                    <i className="fas fa-users me-2"></i>
                                    Gerenciamento de Usuários
                                </h2>
                            </div>
                            <div className="card-body">
                                <UserListWithContext />
                                <div className="mt-4">
                                    <UserPaginationWithContext />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UsersProvider>
    );
}