import BitcoinChart from "components/crypto/bitcoinChart"
import CryptoTable from "components/crypto/cryptoTable"


function CryptoPage() {
    return (
        <div className="crypto">
            <h1>Crypto</h1>
            <BitcoinChart/>
            <CryptoTable/>
        </div>
)
}

export default CryptoPage