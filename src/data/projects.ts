// Placeholder content — replace with real projects before launch (see TASKS.md).
export interface Project {
  id: string
  title: string
  type?: string
  description: string
  tags: string[]
  links: { repo?: string; demo?: string }
  screenshot?: string
}

export const projects: Project[] = [
  {
    id: 'pokazimi',
    title: 'PokazIMI',
    type: 'University Project',
    description: `A mobile application that combines elements of Instagram and Pinterest,
    designed for discovering and sharing images of famous and interesting places around the world.

Users can create posts featuring places they have visited or recommend, browse content shared by other users,
and discover new destinations through a visually focused feed. The application includes
a social system that allows users to interact with content and other members of the community.`,
    tags: ['Kotlin', 'C#', '.NET', 'MS SQL Server'],
    links: {},
  },
  {
    id: 'igrannonica',
    title: 'IgrANNonica',
    type: 'University Project',
    description: `A simple and intuitive machine learning framework designed to make model training accessible to everyone,
    including beginners with little or no previous experience in machine learning.

The application allows users to create, configure, and train machine learning models using their
own datasets without dealing with the complexity typically associated with frameworks such as TensorFlow or PyTorch.

Users can provide a dataset, configure the model and training parameters, start the training process,
and monitor the results through an easy-to-understand interface. The framework handles the underlying training process,
allowing users to focus on experimenting with data and understanding how machine learning models work.`,
    tags: ['Angular', 'C#', 'Python', 'MS SQL Server'],
    links: {},
  },
  {
     id: 'ograsimi',
    title: 'OglasIMI',
    type: 'University Project',
    description: `A job advertisement platform designed to connect job seekers with companies. 
    The application supports two types of users: individuals searching for employment opportunities and company representatives who can create, publish, and manage job advertisements. The platform provides job seekers with an easy way to discover suitable positions while enabling companies to effectively reach and manage potential candidates.`,
    tags: ['Thymeleaf', 'Java', 'MySQL'],
    links: {},
  }
]
