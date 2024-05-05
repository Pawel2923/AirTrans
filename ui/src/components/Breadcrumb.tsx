import { Link } from "react-router-dom";

export interface BreadcrumbItem {
    path: string;
    title: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }: BreadcrumbProps) => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{items.map((item, index) => (
					<li
						key={index}
						className={`breadcrumb-item ${
							index === items.length - 1 ? "active" : ""
						}`}
						aria-current={index === items.length - 1 ? "page" : "false"}
					>
						{index === items.length - 1 ? (
							item.title
						) : (
							<Link to={item.path}>{item.title}</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
