import axios from 'axios';

export const addProduct=(value)=> async()=>{
    axios.post(`/addproduct`,value)
        .then(response => this.setState({ articleId: response.data.id }))
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
}