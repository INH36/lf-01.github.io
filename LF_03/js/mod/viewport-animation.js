export default class ViewportAnimation {
    constructor(options) {
        this.animationDuration = options.animationDuration || 500;
        this.staggerDelay = options.staggerDelay || 200;
        this.threshold = 0.3;
        this.observer = null;
        
        // 处理多容器情况
        this.containers = Array.isArray(options.container_id) 
            ? options.container_id.map(id => document.getElementById(id))
            : [document.getElementById(options.container_id)];
        
        // 处理文本方向，可以是字符串或数组
        if (Array.isArray(options.text_to_direction)) {
            this.text_directions = options.text_to_direction;
        } else {
            // 如果是字符串，为所有容器使用相同的方向
            this.text_directions = Array(this.containers.length).fill(options.text_to_direction || 'right');
        }
        
        // 处理多组文本和图片元素
        this.text_elements = this.processElementGroups(options.text_dom_list_id);
        this.img_elements = this.processElementGroups(options.img_dom_list_id);
    }
    
    // 处理元素组，支持多组元素
    processElementGroups(elementGroups) {
        if (!elementGroups) return [];
        
        return elementGroups.map(group => {
            if (!group || !group.length) return [];
            return group.map(id => document.getElementById(id)).filter(el => el);
        });
    }

    init(){
        this.initStyles();
        this.createObserver();
    }
    
    initStyles() {
        // 为所有文本元素添加样式，每组使用对应的方向
        this.text_elements.forEach((group, groupIndex) => {
            const direction = this.text_directions[groupIndex];
            group.forEach(element => {
                if (element) {
                    element.classList.add(`text-slide-in-${direction}`);
                }
            });
        });
        
        // 为所有图片元素添加样式
        this.img_elements.forEach(group => {
            group.forEach(element => {
                if (element) {
                    element.classList.add('img-fade-in');
                }
            });
        });
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const containerIndex = this.containers.indexOf(entry.target);
                    if (containerIndex !== -1) {
                        // 触发文本动画
                        if (this.text_elements[containerIndex]) {
                            this.animateElements(this.text_elements[containerIndex]);
                        }
                        
                        // 触发图片动画
                        if (this.img_elements[containerIndex]) {
                            this.animateElements(this.img_elements[containerIndex]);
                        }
                        
                        // 停止观察当前容器
                        this.observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: this.threshold 
        });
        
        // 观察所有容器
        this.containers.forEach(container => {
            if (container) {
                this.observer.observe(container);
            }
        });
    }
    
    // 通用元素动画方法
    animateElements(elements) {
        elements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * this.staggerDelay);
            }
        });
    }
}