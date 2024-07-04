import {prosesdata} from "./prosesdata.js";
import {loadtrables} from "./loadtables";
import {uid} from "chart.js/helpers";

export async function validasidata(Swal) {
    var page = window.location.protocol + '//' + window.location.host + "/";
    // cekdata(Swal);
    let url = "",
        aksi = "reload",
        form = "",
        respon = "";
    $(document).on("submit", ".btnsubmit", async function (e) {
        e.preventDefault();
        let data = $(this).data("aksi"),
            form = $(this).serialize();

        switch (data) {
            case "login":
                showLoading(Swal);
                url = page + "loginproses";
                aksi = "nextswitch";
                respon = await prosesdata(form, url, aksi, Swal);
                if (respon === true) {
                    hideloading(Swal);
                }
                break
            case "searchnik":
                var serialnumber = $("input[name=serialnumber]").val() + "/";
                var tanggal1 = $("input[name=tanggal1]").val() + "/";
                var tanggal2 = $("input[name=tanggal2]").val() + "/";
                var nik = $("select[name=nik]").val();
                url = page + "transaksi/" + serialnumber + tanggal1 + tanggal2 + nik;
                window.location.href = url
                break
            case "searchnikall":
                var tanggal1 = $("input[name=tanggal1]").val() + "/";
                var tanggal2 = $("input[name=tanggal2]").val() + "/";
                var nik = $("select[name=nik]").val();
                url = page + "transaksiall/"  + tanggal1 + tanggal2 + nik;
                window.location.href = url
                break

            default:
                Swal.fire({
                    html: "Error no condition.!",
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    target: $('.modal').get(0),
                });
                break;
        }
    });
    $(document).on("click", ".btnclick", async function (e) {
        e.preventDefault();
        let data = $(this).data("aksi"),
            form = $(this).serialize();
        switch (data) {
            case "download":
                showLoading(Swal);
                url = page + "exportexcel";
                aksi = "download";
                form = {
                    serialnumber: $(this).data("serialnumber"),
                    nik: $(this).data("nik"),
                    startdate: $(this).data("tgl1"),
                    enddate: $(this).data("tgl2")
                }
                respon = await prosesdata(form, url, aksi, Swal);
                if (respon === true) {
                    hideloading(Swal);
                }
                break;
            default:
                Swal.fire({
                    html: "Error no condition.!",
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    target: $('.modal').get(0),
                });
                break;
        }
    });
}

async function showLoading(Swal) {
    Swal.fire({
        title: "Waiting Proses",
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        target: document.querySelector('.modal'),
        didOpen: () => {
            Swal.showLoading();
        },
    });
}

async function hideloading(Swal) {
    Swal.close();
}

function hidemodal() {
    $('.viewModal').addClass('hidden');
    $('.viewModal').html('');
}


function modal(formdata, kelas, Swal) {
    showLoading(Swal)
    let uri = page;
    $.ajax({
        url: uri + "component/viewmodal",
        data: formdata,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response) {
            Swal.close();
            $(".viewModal").removeClass('hidden');
            $(".viewModal").html(response.data);
            document.getElementById(kelas).showModal();
            $('.modal').css('z-index', '50');
        },
        error: function (jqXHR, error, errorThrown) {
            // location.reload(true);
        },
    });
}
