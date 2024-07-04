import {pesan} from "./alert.js";

export function prosesdata(form, url, aksi, Swal) {
    let isiwarning = "",
        isiaction = "";
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: url,
            data: form,
            cache: false,
            async: true,
            dataType: "json",
            success: function (response) {
                isiwarning = response.message ? response.message : response.messages;
                if (response.status == 404) {
                    // hidemodal()
                    isiaction = "error";
                    pesan(isiwarning, isiaction, Swal).then(function () {
                        Swal.close()
                        resolve();
                    });
                } else if (response.status == 200) {
                    switch (aksi) {
                        case "reload":
                            location.reload(true);
                            break;
                        case "nextswitch":
                            location.href = response.linked;
                            break;
                        case "nextpage":
                            isiaction = "success";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                location.href = response.linked;
                            });
                            break;
                        case "success&reload":
                            isiaction = "success";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                location.reload(true);
                            });
                            break;
                        case "info":
                            isiaction = "info";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                return true;
                            });
                            break;
                        case "normal":
                            isiaction = "info";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                return true;
                            });
                        case "hidemodal":
                            hidemodal()
                            isiaction = "info";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                Swal.close();
                                resolve();
                            });
                            break;
                        case "getrespon":
                            resolve(response);
                            break;
                        case "download":
                            isiaction = "info";
                            pesan(isiwarning, isiaction, Swal).then(function () {
                                var $a = $("<a>");
                                $a.attr("href", response.file);
                                $("body").append($a);
                                $a.attr("download", response.title + response.downloader);
                                $a[0].click();
                                $a.remove();
                                Swal.close();
                            });
                            break;
                        default:
                            Swal.close();
                            resolve();
                            break;
                    }
                } else {
                    Swal.close()
                    resolve();
                }
            },
            error: function (jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status == 500) {
                    isiwarning = "Communication error with authentication service " + error;
                    isiaction = "error";
                    pesan(isiwarning, isiaction, Swal).then(function () {
                        location.reload();
                    });
                } else if (jqXHR.status && jqXHR.status == 404) {
                    isiwarning = "Address Not Found 404";
                    isiaction = "error";
                    pesan(isiwarning, isiaction, Swal).then(function () {
                        location.reload();
                    });
                } else {
                    isiwarning = "Communication error with authentication service " + error;
                    isiaction = "error";
                    pesan(isiwarning, isiaction, Swal).then(function () {
                        location.reload();
                    });
                }
            },
        });
    });

}

function hidemodal() {
    $('.viewModal').addClass('hidden');
    $('.viewModal').html('');
}
