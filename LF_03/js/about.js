window._AMapSecurityConfig = {
    securityJsCode: "f38ab2b78aee085005a1fd18718ae80c",
};

AMapLoader.load({
    key: "32d6025ec49fbbe6f721377faa4027e1",
    version: "2.0", 
})
    .then((AMap) => {
        const map = new AMap.Map("container",{
            zoom: 15,
            center: [119.241217, 26.053031],
            // 禁止所有地图操作
            dragEnable: false,      // 禁止拖拽
            zoomEnable: false,      // 禁止缩放
            doubleClickZoom: false, // 禁止双击放大
            keyboardEnable: false,  // 禁止键盘操作
            scrollWheel: false,     // 禁止滚轮缩放
            touchZoom: false,       // 禁止触摸缩放
            rotateEnable: false,    // 禁止旋转
            animateEnable: false,   // 禁止动画
            jogEnable: false        // 禁止缓动平移
        });
        const marker = new AMap.Marker({
            position: map.getCenter(),
            offset: new AMap.Pixel(-13, -30)
        });
        map.add(marker);
    })
    .catch((e) => {
        console.error(e);
    });