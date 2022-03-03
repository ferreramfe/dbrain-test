export function convertSnaps<T> (res: any) {
    return <T[]> res.docs.map((snap: any) => {
        return {
            refId: snap.id,
            ...<any>snap.data()
        }
    })
}