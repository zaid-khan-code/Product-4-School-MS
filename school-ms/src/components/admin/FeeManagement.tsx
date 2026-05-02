import { useStore } from '../../store/useStore';

const FeeManagement = () => {
  const { fees, students } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Fee Invoices</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Generate Invoice</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Student</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Paid</th>
              <th className="p-4 font-medium">Due Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {fees.slice(0, 20).map(fee => {
              const student = students.find(s => s.id === fee.studentId);

              let statusColor = 'bg-gray-100 text-gray-800';
              if (fee.status === 'Paid') statusColor = 'bg-green-100 text-green-800';
              if (fee.status === 'Unpaid') statusColor = 'bg-red-100 text-red-800';
              if (fee.status === 'Partial') statusColor = 'bg-yellow-100 text-yellow-800';

              return (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{student?.name}</td>
                  <td className="p-4 text-gray-600">${fee.amount}</td>
                  <td className="p-4 text-gray-600">${fee.paidAmount}</td>
                  <td className="p-4 text-gray-600">{new Date(fee.dueDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeManagement;
