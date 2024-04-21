import BitcoinChart from "components/bitcoinChart"
import LiveBitcoinPrice from "components/liveBitcoinPrice"


function CryptoPage() {
    return (
        <div className="crypto">
            <h1>Crypto</h1>
            <LiveBitcoinPrice/>
            <BitcoinChart/>
        </div>
)
}

export default CryptoPage