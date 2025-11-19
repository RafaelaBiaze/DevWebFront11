import { forwardRef, useMemo } from "react";
import { UserPaginationProps, UserPaginationRef } from "./UserPagination.types";
import { useUsersContext } from "../../providers/UserProvider/usersHooks";

export default forwardRef<UserPaginationRef, UserPaginationProps>(function UserPaginationWithContext({ className }, ref) {

    const { state, changePage } = useUsersContext();

    const currentPage = (typeof state.data === "object") ? state.data.page : state.currentPage;
    const totalPages = (typeof state.data === "object") ? state.data.totalPages : 0;

    const pages = useMemo(() => {
        const out: number[] = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            out.push(i);
        }
        return out;
    }, [currentPage, totalPages]);

    const clickHandler = (page: number) => {
        return () => {
            if (page !== currentPage && page >= 1 && page <= totalPages) {
                changePage(page);
            }
        }
    }

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            changePage(page);
        }
    };

    // Expor métodos via ref
    if (ref && typeof ref === 'object') {
        ref.current = { goToPage };
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className={`d-flex justify-content-center ${className || ""}`} aria-label="Navegação de páginas de usuários">
            <ul className="pagination">
                {/* Botão Primeira Página */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={clickHandler(1)}
                        disabled={currentPage === 1}
                        aria-label="Primeira página"
                    >
                        &laquo;&laquo;
                    </button>
                </li>

                {/* Botão Página Anterior */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={clickHandler(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                    >
                        &laquo;
                    </button>
                </li>

                {/* Páginas numeradas */}
                {pages.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                        <button
                            className="page-link"
                            aria-current={page === currentPage ? "page" : undefined}
                            onClick={clickHandler(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Botão Próxima Página */}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={clickHandler(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima página"
                    >
                        &raquo;
                    </button>
                </li>

                {/* Botão Última Página */}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={clickHandler(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="Última página"
                    >
                        &raquo;&raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
});