function calsvg() {
    var stw, inc, lp, temp;
    var orign_x, orign_y;
    var cw, ch;
    var x, y;

    const gap = 12;
    const margin = 10;
    const parts_height = 40;
    const kerf_height = 20;
    var kerf_width;
    var adjst;

    var txt = "";
    var a

    stw = Number(par_form.form_st.value);
    inc = Number(par_form.form_inc.value);
    lp = Number(par_form.form_lp.value);

    if (inc < 0) {
        inc = inc * (-1);
        stw = stw - inc * (lp - 1);

    }

    if (Math.abs(inc) < 0.01) {
        window.alert("刻み幅が小さすぎます。刻み幅は1/100mm単位までしか設定できません。")
    }

    cw = (stw + inc * lp + gap) * lp + gap + margin * 2;
    ch = parts_height + margin * 2;
    orign_x = margin;
    orign_y = margin;


    var st1 = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"" + cw + "mm\" height=\"" + ch + "mm\" viewBox=\"0 0 " + cw + " " + ch + "\">";
    var ed1 = "</svg>";

    temp = "";
    temp = "<path stroke=\"red\" stroke-width=\"0.1\" fill=\"none\" d=\"M" + orign_x + "," + orign_y;
    x = orign_x;
    y = orign_y;
    kerf_width = stw;

    y = y + parts_height;
    temp = temp + " V" + y;
    x = x + gap;
    temp = temp + " H" + x;
    for (var i = 0; i < lp; i++) {
        kerf_width = stw + inc * i;
        kerf_width = Math.round(kerf_width * 100) / 100;
        if (String(kerf_width).length == 1) {
            adjst = String(kerf_width).length - 1
        } else {
            adjst = String(kerf_width).length - 2
        }
        txt = txt + "<text x=\"" + (x - adjst) + "\" y=\"25\" font-size=\"3\" fill=\"black\">" + kerf_width + "</text>";

        y = y - kerf_height;
        temp = temp + " V" + y;
        x = x + kerf_width;
        temp = temp + " H" + x;
        y = y + kerf_height;
        temp = temp + " V" + y;
        x = x + gap;
        temp = temp + " H" + x;
    }
    y = y - parts_height;
    temp = temp + " V" + y;
    x = orign_x;
    temp = temp + " H" + x;

    temp = temp += "\"/>";

    var svgtxt = st1;
    svgtxt = svgtxt + "\n" + temp;
    svgtxt = svgtxt + "\n" + txt;
    svgtxt = svgtxt + "\n" + ed1;

    var blob = new Blob([svgtxt], { "type": "text/plain" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "LivingHinge.svg");

        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, "LivingHinge.svg");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
    window.alert("kerf Checker SVGデータの作成が完了しました。下のダウンロードボタンからSVGデータのダウンロードが可能です。")

}
