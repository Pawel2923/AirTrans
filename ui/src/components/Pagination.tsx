import React from "react";
import { PageData } from "../assets/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

interface PaginationProps {
	pageData: PageData;
	setPageData: (prevState: PageData) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	pageData,
	setPageData,
}: PaginationProps) => {
	const pagesArray = Array.from(
		{ length: pageData.pages },
		(_, index) => index + 1
	);

	const pageChangeHandler = (page: number) => {
		setPageData({ ...pageData, page: page });
	};

	const prevPageHandler = () => {
		if (pageData.page > 1) {
			setPageData({ ...pageData, page: pageData.page - 1 });
		}
	};

	const nextPageHandler = () => {
		if (pageData.page < pageData.pages) {
			setPageData({ ...pageData, page: pageData.page + 1 });
		}
	};

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				<li
					className={`page-item ${
						pageData.page === 1 ? "disabled" : ""
					}`}
					onClick={prevPageHandler}
					title="Poprzednia strona"
				>
					<span className="page-link">
						<FontAwesomeIcon icon={faAngleLeft} />
					</span>
				</li>
				{pagesArray.map((page: number) => (
					<li
						key={page}
						className={`page-item ${
							page === pageData.page ? "active" : ""
						}`}
						onClick={() => pageChangeHandler(page)}
					>
						<span className="page-link">{page}</span>
					</li>
				))}
				<li
					className={`page-item ${
						pageData.page === pageData.pages ? "disabled" : ""
					}`}
					onClick={nextPageHandler}
					title="Następna strona"
				>
					<span className="page-link">
						<FontAwesomeIcon icon={faAngleRight} />
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
