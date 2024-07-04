export async function loadtrables() {

    var table = $('#datatables').DataTable({
        "lengthMenu": [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, "All"]],
        "pageLength": 25,
        ordering: false,
        responsive: true,
        bAutoWidth: true,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 },
            { className: "dt-start text-xs font-consolas", targets: [1] },
            { className: "dt-center text-xs font-consolas", targets: "_all" }, // Add class 'dt-center' to all cells

        ],
        language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search...',
            "lengthMenu": "Display _MENU_ records per page", // Teks untuk label (Opsional, sesuaikan jika perlu)
            "zeroRecords": "No records found", // Teks saat tidak ada data (Opsional)
            "info": "Showing page _PAGE_ of _PAGES_", // Teks informasi paging (Opsional)
            "infoEmpty": "No records available", // Teks saat tidak ada data (Opsional)
            "infoFiltered": "(filtered from _MAX_ total records)",
        }
    }).columns.adjust().draw().responsive.recalc();

} 