import React, { useState } from 'react';

const ActiveEvaluation = () => {
    const [activeTab, setActiveTab] = useState('aktif');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const allData = [
        {
            id: 1,
            periode: 'Oktober 2025',
            unitInduk: 'Unit Induk ABC',
            tanggalDibuat: '20 Aug 2025',
            totalPagu: 'Rp 250.000.000',
            tahapan: 'GM',
            status: 'Proses Approval'
        },
        {
            id: 2,
            periode: 'September 2025',
            unitInduk: 'Unit Induk ABC',
            tanggalDibuat: '20 Aug 2025',
            totalPagu: 'Rp 250.000.000',
            tahapan: 'Asman & Staff Yan HC',
            status: 'Proses Approval'
        },
        {
            id: 3,
            periode: 'Agustus 2025',
            unitInduk: 'Unit Induk ABC',
            tanggalDibuat: '20 Aug 2025',
            totalPagu: 'Rp 250.000.000',
            tahapan: 'MD Evaluator Yan HC',
            status: 'Proses Approval'
        },
        {
            id: 4,
            periode: 'Juli 2025',
            unitInduk: 'Unit Induk ABC',
            tanggalDibuat: '20 Aug 2025',
            totalPagu: 'Rp 250.000.000',
            tahapan: '-',
            status: 'Disetujui'
        },
        {
            id: 5,
            periode: 'Juni 2025',
            unitInduk: 'Unit Induk ABC',
            tanggalDibuat: '20 Aug 2025',
            totalPagu: 'Rp 250.000.000',
            tahapan: '-',
            status: 'Disetujui'
        },
        {
            id: 6,
            periode: 'Mei 2025',
            unitInduk: 'Unit Induk XYZ',
            tanggalDibuat: '15 Aug 2025',
            totalPagu: 'Rp 180.000.000',
            tahapan: 'GM',
            status: 'Ditolak'
        },
        {
            id: 7,
            periode: 'April 2025',
            unitInduk: 'Unit Induk XYZ',
            tanggalDibuat: '10 Aug 2025',
            totalPagu: 'Rp 200.000.000',
            tahapan: 'MD Evaluator Yan HC',
            status: 'Ditolak'
        },
        {
            id: 8,
            periode: 'Maret 2025',
            unitInduk: 'Unit Induk DEF',
            tanggalDibuat: '05 Aug 2025',
            totalPagu: 'Rp 150.000.000',
            tahapan: 'Asman & Staff Yan HC',
            status: 'Ditolak'
        }
    ];

    // Filter data based on active tab
    const filteredData = activeTab === 'aktif'
        ? allData.filter(item => item.status !== 'Ditolak')
        : allData.filter(item => item.status === 'Ditolak');

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <span className="text-gray-500 text-sm">Evaluasi Lembur</span>
                </div>

                {/* Page Title with Border */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-teal-600 rounded-full"></div>
                        <h1 className="text-2xl font-bold text-gray-800">Evaluasi Lembur</h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => {
                            setActiveTab('aktif');
                            setCurrentPage(1);
                        }}
                        className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'aktif'
                            ? 'text-teal-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Evaluasi Aktif
                        {activeTab === 'aktif' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('ditolak');
                            setCurrentPage(1);
                        }}
                        className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'ditolak'
                            ? 'text-teal-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Evaluasi Ditolak
                        {activeTab === 'ditolak' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                        )}
                    </button>
                </div>

                {/* Table Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {activeTab === 'aktif' ? 'Table Evaluasi Aktif' : 'Table Evaluasi Ditolak'}
                    </h2>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari Pekerjaan"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-4 pr-12 py-2.5 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <button className="absolute right-0 top-0 bottom-0 px-4 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Filter Button */}
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>

                        {/* Add Button */}
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Periode
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Unit Induk
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Tanggal Dibuat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Total Pagu Terpakai
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Tahapan Persetujuan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentData.map((row, index) => (
                                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.periode}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.unitInduk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.tanggalDibuat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.totalPagu}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.tahapan}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${row.status === 'Proses Approval'
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : row.status === 'Ditolak'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-teal-100 text-teal-700'
                                                    }`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* View Button */}
                                                <button
                                                    onClick={() => alert(`Lihat detail: ${row.periode}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => alert(`Edit: ${row.periode}`)}
                                                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Hapus evaluasi periode ${row.periode}?`)) {
                                                            alert(`Dihapus: ${row.periode}`);
                                                        }
                                                    }}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-white">

                        {/* LEFT — Showing X of Y */}
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <span>Menampilkan</span>

                            <div className="relative">
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="
                    h-9 
                    pl-3 pr-8 
                    border border-gray-300 
                    rounded-lg 
                    bg-white 
                    text-sm
                    focus:ring-2 focus:ring-teal-500
                "
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>

                                {/* dropdown icon */}
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">

                                </span>
                            </div>

                            <span>dari {filteredData.length} Data</span>
                        </div>

                        {/* RIGHT — Pagination */}
                        <div className="flex items-center gap-1">

                            {/* Prev */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="
                w-9 h-9 flex items-center justify-center 
                rounded-md transition
                disabled:opacity-40 
                hover:bg-gray-100
            "
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`
                    w-9 h-9 flex items-center justify-center rounded-md text-sm
                    ${currentPage === i + 1
                                            ? "bg-teal-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }
                `}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* Next */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="
                w-9 h-9 flex items-center justify-center 
                rounded-md transition
                disabled:opacity-40 
                hover:bg-gray-100
            "
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveEvaluation;