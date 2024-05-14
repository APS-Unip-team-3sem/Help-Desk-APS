// import TableOne from '../components/Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import TableTickets from '../components/Tables/TableTickets';
import OpenTicket from './OpenTicket';

const Tables = () => {
  return (
    <DefaultLayout>

      <div className="flex flex-col gap-10">
        <TableTickets />
        <OpenTicket />
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
        
      </div>
    </DefaultLayout>
  );
};

export default Tables;
