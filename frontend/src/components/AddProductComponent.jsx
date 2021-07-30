import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormFields(props) {
  const classes = useStyles(); 

  return (
      <>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="name"
          label="name"
          variant="outlined"
          value={props.values.name}
          onChange={props.handleChange('name')}
        />
        <TextField
          required
          id="price"
          label="price"
          variant="outlined"
          value={props.values.price}
          onChange={props.handleChange('price')}
        />
        <TextField
          required
          id="inStock"
          label="In Stock"
          variant="outlined"
          value={props.values.inStock}
          onChange={props.handleChange('inStock')}
        />
        <TextField
          required
          id="image"
          label="Image Url"
          variant="outlined"
          value={props.values.ImageUrl}
          onChange={props.handleChange('ImageUrl')}
        />
      </div>
      <div >
        <TextField
          required
          id="description"
          label="Description"
          variant="outlined"
          value={props.values.description}
          multiline
          fullWidth
          maxRows={4}
          onChange={props.handleChange('description')}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={props.handleSubmit}>
            Submit
        </Button>
      </div>
    </form>
    </>
  );
}
