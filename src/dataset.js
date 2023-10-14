const dataset = {
    tasks: {
        "task-1": { id: "task-1", content: "Content for task 1" },
        "task-2": { id: "task-2", content: "Content for task-2" },
        "task-3": { id: "task-3", content: "Content for task-3" },
        "task-4": { id: "task-4", content: "Content for task-4" },
        "task-5": { id: "task-5", content: "Content for task-5" },
        "task-6": { id: "task-6", content: "Content for task-6" },
        "task-7": { id: "task-7", content: "Content for task-7" },
    },
    columns: {
        "column-1": { id: "column-1", title: "Mon", subTitle: '01', taskIds: ['task-1'] },
        "column-2": { id: "column-2", title: "Tue", subTitle: '02', taskIds: ['task-2', 'task-3'] },
        "column-3": { id: "column-3", title: "Web", subTitle: '03', taskIds: [] },
        "column-4": { id: "column-4", title: "Thu", subTitle: '04', taskIds: ["task-4"] },
        "column-5": { id: "column-5", title: "Fri", subTitle: '05', taskIds: ['task-5'] },
        "column-6": { id: "column-6", title: "Sat", subTitle: '06', taskIds: ['task-6'] },
        "column-7": { id: "column-7", title: "Sun", subTitle: '07', taskIds: ['task-7'] },

    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6", "column-7"]
}

export default dataset