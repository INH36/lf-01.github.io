/// 自定义tailwind 设置

tailwind.config = {
    theme: {
        fontFamily: {
            sans: ['Microsoft YaHei UI', 'sans-serif'],
        },
        extend: {
            colors: {
                tabbar: '',
                active: '#FF350D'
            },
            height: {
                tabbar: '100px'
            },
            backgroundColor: {
                tabbar: '#252429',
                active: '#FF350D',
                home: '#f6f6f6',
                footer: '#FF350D'
            },
        }
    }
}