export default class ViewportAnimation {
    constructor(options) {
        this.animationDuration = options.animationDuration || 500;
        this.staggerDelay = options.staggerDelay || 200;
        this.text_dom_list_id = options.text_dom_list_id.map((item)=>{
            return document.getElementById(item);
        }) || []; 
        this.img_dom_list_id = options.img_dom_list_id.map((item)=>{
            return document.getElementById(item);
        }) || [];
        this.container_id = document.getElementById(`${options.container_id}`);  // 容器id
        this.threshold = 0.3;
        this.observer = null;
    }

    init(){
        this.initStyles();
        this.createObserver();
    }
    
    initStyles() {
        this.text_dom_list_id.forEach(element => {
            element.classList.add('text-slide-in');
        });
        this.img_dom_list_id.forEach(element => {
            element.classList.add('img-fade-in');
        });
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.text_dom_list_id.forEach((element, index) => {
                        if (element) {
                            setTimeout(() => {
                                element.classList.add('visible');
                            }, index * this.staggerDelay);
                        }
                    });
                    
                    // 依次触发图片渐显动画
                    this.img_dom_list_id.forEach((element, index) => {
                        if (element) {
                            setTimeout(() => {
                                element.classList.add('visible');
                            }, index * this.staggerDelay);
                        }
                    });
                    this.observer.unobserve(this.container_id);
                }
            });
        }, {
            threshold: this.threshold 
        });
        
        if (this.container_id) {
            this.observer.observe(this.container_id);
        }
    }
}