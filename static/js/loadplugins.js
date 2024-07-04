// Function to load JS files dynamically
import { loadtrables } from "./package/loadtables";
function loadJS(FILE_URL) {
    return new Promise((resolve, reject) => {
        let dynamicScript = document.createElement("script");
        dynamicScript.src = FILE_URL;

        dynamicScript.onload = resolve;
        dynamicScript.onerror = reject;

        document.body.appendChild(dynamicScript);
    });
}

// Function to load CSS files dynamically
function loadCSS(FILE_URL) {
    return new Promise((resolve, reject) => {
        let dynamicStylesheet = document.createElement("link");
        dynamicStylesheet.href = FILE_URL;
        dynamicStylesheet.rel = "stylesheet";

        dynamicStylesheet.onload = resolve;
        dynamicStylesheet.onerror = reject;

        document.head.appendChild(dynamicStylesheet);
    });
}

// Function to initialize the dynamic loading based on the current page
export async function loadpluginAsset() {

    let to_build = window.location.protocol + '//' + window.location.host +'/';
    try {
        await loadCSS(to_build + "static/style.css");
        await loadCSS(to_build + "static/vendor/select2/select2.min.css");
        await loadCSS(to_build + "static/vendor/boxicons/css/animations.css");
        await loadCSS(to_build + "static/vendor/boxicons/css/boxicons.css");
        await loadCSS(to_build + "static/vendor/boxicons/css/transformations.css");
        await loadJS(to_build + "static/vendor/select2/select2.min.js");
        await loadJS(to_build + "static/vendor/jam/buttons.js");
        await loadJS(to_build + "static/vendor/jam/jam.js");
        await loadCSS(to_build + "static/vendor/jam/jam.min.css");
        // switch (layer) {
        //     case "layer1":
                await loadJS(to_build + "static/vendor/datatables/jquery.datatables.min.js");
                await loadJS(to_build + "static/vendor/datatables/datatables.responsive.min.js");
                await loadCSS(to_build + "static/vendor/datatables/jquery.datatables.css");
                await loadCSS(to_build + "static/vendor/datatables/responsive.datatables.min.css");
                await loadCSS(to_build + "static/vendor/datatables/datatables.tailwindcss.min.css");
                await loadCSS(to_build + "static/vendor/datatables/responsive.datatables.min.css");
        //         break;
        // }
        if ($(".singeclock").length || $(".multipleclock").length) {
        
            flatpickr('.singeclock', {
                disableMobile: "true",
                plugins: [
                    ShortcutButtonsPlugin({
                        button: [
                            {
                                label: "Yesterday"
                            },
                            {
                                label: "Today"
                            },
                            {
                                label: "Tomorrow"
                            }
                        ],
                        label: "or",
                        onClick: (index, fp) => {
                            let date;
                            switch (index) {
                                case 0:
                                    date = new Date(Date.now() - 24 * 60 * 60 * 1000);
                                    break;
                                case 1:
                                    date = new Date();
                                    break;
                                case 2:
                                    date = new Date(Date.now() + 24 * 60 * 60 * 1000);
                                    break;
                            }
                            fp.setDate(date);
                        }
                    })
                ]
            });
            flatpickr('.multipleclock', {
                disableMobile: "true",
                mode: "range",
                dateFormat: "Y-m-d",
            });
        }
        if ($("#datatables").length) {
            $('select[name=datatables_length]').addClass('!w-[4rem]');
            loadtrables()
        }
        if ($(".select2").length) {
            $('.select2').select2();
        }


        // await loadJS(to_build + "repository/vendor/datetimepicker/jam.js");
    } catch (error) {
        console.error('Error during dynamic loading:', error);
        throw error;
    }
}



// jsFiles = [

//     to_build + "repository/vendor/clipboard/clipboard.min.js",

