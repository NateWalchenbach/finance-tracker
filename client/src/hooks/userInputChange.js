const useInputChange = ( formState, setFormState ) => {
    return (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };
}

export default useInputChange;