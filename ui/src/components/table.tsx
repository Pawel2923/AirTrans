const Tabela = () => {
    const tabelkaStyle: React.CSSProperties = {
        
        backgroundColor: "#f8f9fb",
        borderCollapse: "collapse",
        borderRadius: "10px",
        width: "400px",
        textAlign: "center",
    };
    const thStyle: React.CSSProperties = {
        
        borderRadius: "10px",
    };
    
    const tdStyle: React.CSSProperties = {
        border: "1px solid #000",
        borderRadius: "10px 10px 10px 10px",
    };

    return (
        <table style={tabelkaStyle}>
            <thead>
                <tr>
                    <th style={thStyle}>
                        <h2>Tytuł</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={tdStyle}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim
                            pariatur ullam molestiae? Ea dignissimos architecto minima aliquid
                            soluta, eum ab explicabo consectetur neque. Dignissimos tempora
                            possimus est perferendis ea. Lorem ipsum, dolor sit amet
                            consectetur adipisicing elit. Tempora similique dolor suscipit
                            assumenda magni aperiam et soluta ab rerum! Ex minima consequuntur
                            voluptatibus libero eius? Labore, cum. Sunt, ea expedita.
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
    }
  export default Tabela;