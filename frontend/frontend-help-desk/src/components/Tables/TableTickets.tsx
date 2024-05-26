import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllChamados } from '../../api/chamado';
import { Link } from 'react-router-dom';

const priorityOrder = {
  ALTA: 3,
  MEDIA: 2,
  BAIXA: 1
};

const priorityBadges = {
  ALTA: 'bg-red-100 text-red-800 px-2 py-1 rounded-sm text-xs',
  MEDIA: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-sm text-xs',
  BAIXA: 'bg-green-100 text-green-800 px-2 py-1 rounded-sm text-xs'
};

const statusBadges = {
  ABERTO: 'bg-green-100 text-green-800 px-2 py-1 rounded-sm text-xs',
  FECHADO: 'bg-red-100 text-red-800 px-2 py-1 rounded-sm text-xs',
  ANDAMENTO: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-sm text-xs'
};

const formatDate = (date) => {
  if (!date || !(date instanceof Date)) {
    return ''; // Return empty string if date is not valid
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
};

const TableTickets = () => {
  const [chamados, setChamados] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); 
  const [filterOption, setFilterOption] = useState('Últimos 30 dias');

  useEffect(() => {
    const fetchChamados = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      try {
        const response = await getAllChamados(token!);
        if (response.data) {
          setChamados(response.data);
        } else {
          console.error('Erro ao carregar os chamados');
        }
      } catch (error) {
        console.error('Erro ao carregar os chamados:', error);
      }
    };

    fetchChamados();
  }, []);

  // Funções para ir para a próxima página e a página anterior
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleCheckboxChange = (id) => {
    // Implemente a lógica aqui para lidar com a seleção de linha
    console.log('Checkbox selecionado:', id);
  };

  const filteredData = chamados.filter(data => {
    const dataDate = new Date(data.openDate);
    return dataDate >= startDate && dataDate <= endDate;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortBy === 'openDate') {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      const compareValue = dateA > dateB ? 1 : -1;
      return sortDirection === 'asc' ? compareValue : -compareValue;
    } else if (sortBy === 'priority') {
      const priorityA = priorityOrder[a[sortBy]];
      const priorityB = priorityOrder[b[sortBy]];
      const compareValue = priorityA - priorityB;
      return sortDirection === 'asc' ? compareValue : -compareValue;
    } else {
      const compareValue = a[sortBy] > b[sortBy] ? 1 : -1;
      return sortDirection === 'asc' ? compareValue : -compareValue;
    }
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Calcule o índice inicial e final dos dados a serem exibidos na página atual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (option) => {
    setFilterOption(option);

    // Atualize as datas de início e término com base na opção de filtro selecionada
    const today = new Date();
    switch (option) {
      case 'Último dia':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
        setEndDate(today);
        break;
      case 'Últimos 7 dias':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
        setEndDate(today);
        break;
      case 'Últimos 30 dias':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30));
        setEndDate(today);
        break;
      case 'Último mês':
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(firstDayOfMonth);
        setEndDate(today);
        break;
      case 'Último ano':
        const firstDayOfYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        setStartDate(firstDayOfYear);
        setEndDate(today);
        break;
      default:
        break;
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ minHeight: '800px' }}>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
              />
            </svg>
            Últimos 30 dias
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate3d(522.5px, 3847.5px, 0px)' }}>
            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Último dia</label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    checked={true}
                    id="filter-radio-example-2"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Últimos 7 dias</label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Últimos 30 dias</label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <label htmlFor="filter-radio-example-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Último mês</label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <label htmlFor="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Último ano</label>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="flex items-center">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date || new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-500 p-2 rounded-lg"
          />
          <span className="mx-2">-</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date || new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-500 p-2 rounded-lg"
          />
        </div>
        <label htmlFor="table-search" className="sr-only">Pesquisar</label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Pesquisar por tickets"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none cursor-pointer"
        >
          Próxima
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(chamado?.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              </div>
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('codTicket')}>
              Ticket {sortBy === 'codTicket' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('openDate')}>
              Data {sortBy === 'openDate' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('priority')}>
              Prioridade {sortBy === 'priority' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('status')}>
              Status {sortBy === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('userID')}>
              Usuário {sortBy === 'userID' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3" onClick={() => handleSort('technicianID')}>
              Técnico {sortBy === 'technicianID' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
        {chamados.map(chamado =>  (
          <tr key={chamado?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id={`checkbox-table-search-${chamado?.id}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {/* Usar o componente Link para redirecionar */}
              <Link to={`/ticket/${chamado?.id}`} className="hover:underline">
                {chamado?.id}
              </Link>
            </td>

            <td className="px-6 py-4">{formatDate(new Date(chamado.abertura))}</td>
            {/* <td className="px-6 py-4">{chamado.abertura}</td> */}
            <td className={`px-4 py-2 rounded-lg ${priorityBadges[chamado.prioridadeChamado]}`}>{chamado.prioridadeChamado}</td>
<td className={`px-4 py-2 rounded-lg ${statusBadges[chamado.statusChamado]}`}>{chamado.statusChamado}</td>
            <td className="px-6 py-4">{chamado?.usuarioModel.nome}</td>
            {/* usuario respondavel nome se n tiver colocar N/A: */}
            <td className="px-6 py-4">
              {/* {chamado?.usuarioModelResponsavel ? chamado?.usuarioModelResponsavel.nome : 'N/A'} */}
              {chamado?.usuarioModelResponsavel?.nome || 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>

  );
};

export default TableTickets;