import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    getNewID = list =>{
        const count = list.length;
        return (count > 0) ? list[count - 1].id + 1 : 1;
    } 

    add = async ({title, description, price, thumbnail, code, stock, category}) => {
        const list = await this.get();
        const newID = this.getNewID(list);
        const exis = list.some(el => el.code == code);
        if (!exis) {
            const newProduct = {
                id: newID,
                title: title ?? "",
                description: description ?? "",
                price: price ?? 0.0,
                thumbnail: thumbnail ?? [],
                code: code ?? '',
                stock: stock ?? 0,
                status: true,
                category: category ?? "general"
            };
            list.push(newProduct);
            await this.write(list);
            return newProduct;
        }
        return {error: `code: ${code} already exists`};
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
        }
        return [];
    }

    write = async list => {
        fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    get = async () => {
        const list = await this.read();
        return list;
    }

    getbyId = async (id) => {
        const list = await this.get();
        return list.find((prod) => prod.id == id);
    }

    update = async (id, obj) => {
        obj.id = id;
        const list = await this.read();

        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    delete = async (id) => {
        const list = await this.get();
        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }

}

export default ProductManager;