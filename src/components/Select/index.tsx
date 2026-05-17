import "./style.css"

interface SelectProps {
    opcoes:string[];
    texto: string;
    valor: string; 
    setValor: (novoValor: string) => void; 
}

export function Select({opcoes, texto, valor, setValor} : SelectProps) {

    return (
        <div className="select-container">
        <select className = "custom-select" value={valor} onChange={(e) => setValor(e.target.value)} required>
            <option value="" >{texto}</option>
            {opcoes.map((opcao) => (
            <option key={opcao} value={opcao}>
                {opcao}
            </option>
            ))}
        </select>
        </div>
    );
}