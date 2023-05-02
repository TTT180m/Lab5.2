import RootStore from "./RootStore";

const storeProvider = RootStore.create({
    contents:[
        {
            id: '1',
            title: 'Marca',
            description: 'Type the GPU name',
            seen: false,
            notes: '',
        },
        {
            id: '2',
            title: 'Modelul',
            description: 'Enter the URL',
            seen: false,
            notes: '',
        },
        {
            id: '3',
            title: 'Anul',
            description: 'Type the Group',
            seen: false,
            notes: '',
        },
        {
            id: '4',
            title: 'Email',
            description: 'Type the mail',
            seen: true,
            notes: '',
        }
    ]
})

export default storeProvider;