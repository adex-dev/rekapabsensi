


export function style() {
    customize()
}
function customize() {
    $(".readonly").keydown(function (e) {
        e.preventDefault();
    });
    $(".readonly").on("cut", function (e) {
        e.preventDefault();
    });
    $(".readonly").on("paste", function (e) {
        e.preventDefault();
    });
    $("input").attr("autocomplete", "off");
    $("img").attr("lazy", "loading");
    $(document).on("keyup", "input[type=email]", function () {
        let a = $(this).val().replace(/[^a-zA-Z0-9_.@]+/, "");
        $(this).val(a);
    });
    $(document).on("keyup", "input[type=tel]", function () {
        let a = $(this).val().replace(/[^0-9]+/, "");
        $(this).val(a);
    });

    $(document).on("keyup", ".rupiah", function () {
        let nums = $(this).val();
        var nama = $(this).attr("name");

        rupiah(nums, nama)
    });
    $(document).on("keyup", ".cardnumber", function () {
        let nums = $(this).val();
        var nama = $(this).attr("name");

        cardnumber(nums, nama)
    });
    $(document).on("click", ".pass", function (e) {
        e.preventDefault();
        var type = $("input[name=password]").attr("type");
        // now test it's value
        if (type === "password") {
            $(this).addClass("bxs-lock-open");
            $(this).removeClass("bxs-lock");
            $("input[name=password]").attr("type", "text");
        } else {
            $(this).removeClass("bxs-lock-open");
            $(this).addClass("bxs-lock");
            $("input[name=password]").attr("type", "password");
        }
    });
}


