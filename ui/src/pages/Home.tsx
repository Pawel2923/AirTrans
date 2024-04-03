import Nav from "../components/Nav";
import homeStyles from "./Home.module.css";

const Home = () => {
	return (
		<>
            <Nav />
			<header className={homeStyles.header}>
                <div className="container">
                    <div className="row">
                        <div className="col-6 text-center">
                            <h1 className="display-3 fw-bold">Witamy na stronie AirTrans</h1>
                            <p className="lead">Zaplanuj swoją podróż z nami</p>
                        </div>
                        <div className="col-6">
                            Tabela
                        </div>
                    </div>
                </div>
            </header>
		</>
	);
};

export default Home;
