import { useStore } from '../../store/useStore';

const LibraryManagement = () => {
  const { libraryBooks } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Library Books</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Book</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Author</th>
              <th className="p-4 font-medium">ISBN</th>
              <th className="p-4 font-medium">Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {libraryBooks.slice(0, 20).map(book => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{book.title}</td>
                <td className="p-4 text-gray-600">{book.author}</td>
                <td className="p-4 text-gray-600">{book.isbn}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.availableCopies} / {book.totalCopies} Available
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryManagement;
