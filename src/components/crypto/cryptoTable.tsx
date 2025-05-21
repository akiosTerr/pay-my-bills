import React, { useState, useEffect } from "react";
import { CryptoStructure, fetchCryptocurrencies, NewCryptoInput, RemoveCrypto } from "api_actions/cryptoService";
import { CryptoCurrency } from "../interfaces/interfaces";
import { CryptoPrice, getPriceBrl, getPriceUsd } from "utils/general_utils";
import { CryptoTableElement, Totalnetworth } from "./cryptoTable.style";
import { styled } from "styled-components";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DeleteCryptoModal from "components/modal/DeleteCryptoModal";
import EditCrytoModal from "components/modal/EditCryptoModal";
import CreateCryptoModal from "components/modal/CreateCryptoModal";



function formatToCurrency(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
  });
}

const AddCryptoBtn = styled.button`
    border-radius: 1rem;
    height: auto;
    font-size: 2rem;
    text-align: center;
    border: 1px solid white;
    width: 50%;
    color: lime;
    background-color: transparent;
    cursor: pointer;
`

const AddCryptoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MenuCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  .buttonGroup {
    display: flex;
    flex-direction: column;
  }
`

const CellTitle = styled.h2`
  color: #02d673;
`

const IconButton = styled.button<{ $danger?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 20%;
  background: transparent;
  color: aliceblue;
  border: none;
  margin: 0px .3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 1px solid ${(p) => (p.$danger ? 'red' : 'yellow')};;
  }
`

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] =
    useState<CryptoCurrency[]>([]);
  const [currentPrice, setCurrentPrice] = useState<CryptoPrice[]>([]);
  const [totalUsd, setTotalUsd] = useState<number>(0);
  const [totalBrl, setTotalBrl] = useState<number>(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const [cryptoIdToDelete, setCryptoIdToDelete] = useState<string>('')
  const [cryptoToEdit, setCryptoToEdit] = useState<CryptoStructure>({
    _id: '0',
    name: 'default',
    urlname: 'default',
    amount: 0,
    symbol: 'default'
  })

  const loadData = async () => {
    const updatedCryptos = await fetchCryptocurrencies();
    const priceData = updatedCryptos.map((item) => {
      const { name, current_price_usd, current_price_brl } = item
      return {
        name,
        current_price_usd,
        current_price_brl
      }
    })
    setCryptoData(updatedCryptos)
    setCurrentPrice(priceData)
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateTotals(cryptoData)
  }, [currentPrice, cryptoData])

  const addNewCrypto = () => {
    loadData()
  }

  const updateTotals = (cryptos: CryptoCurrency[]) => {
    const getTotal = (coinValues: number[]) => {
      if (coinValues.length === 0)
        return 0
      const total = coinValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      return total;
    };

    const getTotalUsd = () => {
      const totalValueList = cryptos.map(
        (crypto) => crypto.amount * getPriceUsd(crypto.name, currentPrice)
      );
      return getTotal(totalValueList);
    };
    const getTotalBrl = () => {
      const totalValueList = cryptos.map(
        (crypto) => crypto.amount * getPriceBrl(crypto.name, currentPrice)
      );
      return getTotal(totalValueList);
    };
    setTotalUsd(getTotalUsd());
    setTotalBrl(getTotalBrl());
  };

  const getCryptoById = (id: string): CryptoCurrency | undefined => {
    return cryptoData.find(crypto => crypto._id === id)
  }

  const buildCryptoPayload = (id: string) => {
    const cryptoItem = getCryptoById(id)
    if (cryptoItem === undefined)
      throw new Error("crypto not found")
    const { _id, name, urlname, amount, symbol } = cryptoItem
    return {
      _id,
      name,
      urlname,
      amount,
      symbol
    }
  }

  const callDeleteModal = (id: string) => {
    if (id) {
      setCryptoIdToDelete(id)
      setDeleteModalOpen(true)
    }
  }

  const callEditModal = (id: string) => {
    if (id) {
      const body = buildCryptoPayload(id)
      setCryptoToEdit(body)
      setEditModalOpen(true)
    }
  }

  const callCreateModal = () => {
    setCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
  }

  const closeDeleteModal = () => {
    setCryptoIdToDelete('')
    setDeleteModalOpen(false)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }

  return (
    <>
      <DeleteCryptoModal id={cryptoIdToDelete} amount={getCryptoById(cryptoIdToDelete)?.amount} label={getCryptoById(cryptoIdToDelete)?.name} cancel={closeDeleteModal} open={deleteModalOpen} />
      <EditCrytoModal payload={cryptoToEdit} cancel={closeEditModal} open={editModalOpen} />
      <CreateCryptoModal cancel={closeCreateModal} open={createModalOpen} />
      <CryptoTableElement>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owned</th>
            <th>Price (USD)</th>
            <th>Price (BRL)</th>
            <th>Value (USD)</th>
            <th>Value (BRL)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>
              <hr />
            </td>
          </tr>
          {cryptoData.map((crypto) => (
            <tr key={crypto.urlname}>
              <td>
                <MenuCell>
                  <div className="buttonGroup">
                    <IconButton onClick={() => callEditModal(crypto._id)} ><FaEdit color="yellow" style={{ width: "20px", height: "20px" }} /></IconButton>
                    <IconButton onClick={() => callDeleteModal(crypto._id)} $danger><MdDeleteForever color="red" style={{ width: "20px", height: "20px" }} /></IconButton>
                  </div>
                  <CellTitle>{crypto.name}</CellTitle>
                </MenuCell>
              </td>
              <td>{crypto.amount}</td>
              <td>${getPriceUsd(crypto.name, currentPrice).toFixed(2)}</td>
              <td>R${getPriceBrl(crypto.name, currentPrice).toFixed(2)}</td>
              <td>
                ${(crypto.amount * getPriceUsd(crypto.name, currentPrice)).toFixed(2)}
              </td>
              <td>
                R${(crypto.amount * getPriceBrl(crypto.name, currentPrice)).toFixed(2)}
              </td>
              <td>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={7}>
              <AddCryptoWrapper>
                <AddCryptoBtn onClick={() => callCreateModal()}>Create Coin</AddCryptoBtn>
              </AddCryptoWrapper>
            </td>
          </tr>
          <tr>
            <td colSpan={7}>
              <Totalnetworth>
                Total: {formatToCurrency(totalBrl, "BRL")} {formatToCurrency(totalUsd)}
              </Totalnetworth>
            </td>
          </tr>
        </tbody>
      </CryptoTableElement>

    </>
  );
};

export default CryptoTable;
