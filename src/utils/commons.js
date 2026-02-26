export const newRole = (id) => {
        const role = {
            1: "Admin",
            2: "Read Only",
            3: "Task Creater"
        }
        return role[id]
    }