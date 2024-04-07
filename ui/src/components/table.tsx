const Tabela = () => {
    const tabelkaStyle: React.CSSProperties = {
        
        backgroundColor: "#f8f9fb",
        borderCollapse: "collapse",
        borderRadius: "10px",
        width: "400px",
        textAlign: "center",
    };
    const tytulStyle: React.CSSProperties = {
        
        borderRadius: "10px",
    };
    
    const trescStyle: React.CSSProperties = {
        padding: "10px",
        borderRadius: "10px 10px 10px 10px",
    };

    return (
        <div style={tabelkaStyle}>
            <div style={tytulStyle}>
                <h2>Tytuł</h2>
            </div>
            <div style={trescStyle}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim
                    pariatur ullam molestiae? Ea dignissimos architecto minima aliquid
                    soluta, eum ab explicabo consectetur neque. Dignissimos tempora
                    possimus est perferendis ea. Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Tempora similique dolor suscipit
                    assumenda magni aperiam et soluta ab rerum! Ex minima consequuntur
                    voluptatibus libero eius? Labore, cum. Sunt, ea expedita.
                </p>
            </div>
        </div>
    );
    }
  export default Tabela;