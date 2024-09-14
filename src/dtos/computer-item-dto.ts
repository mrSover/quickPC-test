class ComputerItemDto {
    name: string;
    price: number;
    type: string;
    description: string;
    is_on_sale: boolean;
    is_hot: boolean;
    img: string;
    item_info: { name: string, value: string }[];

    constructor(component: ComputerItemDto) {
        this.name = component.name;
        this.price = component.price;
        this.type = component.type;
        this.description = component.description;
        this.is_on_sale = component.is_on_sale;
        this.is_hot = component.is_hot;
        this.img = component.img;
        this.item_info = component.item_info;
    }
}

export { ComputerItemDto };