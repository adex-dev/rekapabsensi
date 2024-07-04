import { style } from "./package/styles.js";
import { validasidata } from "./package/validasidata.js";
import { loadpluginAsset } from "./loadplugins.js";
import Swal from 'sweetalert2';

async function initialize() {
    try {
        await loadpluginAsset();
        $(document).ready(function () {
            style();
            validasidata(Swal);

        });
    } catch (error) {
    }
}

initialize();
