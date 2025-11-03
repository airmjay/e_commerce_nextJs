interface Props {
    file: object;
}

const UploadImage = async ({ file }: Props) => {
    if (!file) {
        try {
            const data = new formData();
            return data.set("file", file);
        } catch (e) {
            console.log(e);
        }
    }
};

export default UploadImage;
