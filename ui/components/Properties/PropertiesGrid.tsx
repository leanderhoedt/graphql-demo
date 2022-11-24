import {memo} from "react";
import PropertyEditor from "./PropertyEditor";

interface PropertiesGridProps {
    fields?: {
        name?: string;
        title?: string;
        editor?: string
    }[];
    control?: object;
}

const PropertiesGrid = ({
                            fields = [],
                            control
                        }: PropertiesGridProps) => {
    return (
        <div className="grid grid-cols-6 gap-2">
            {
                fields.map(({title, editor, ...field}) => <PropertyEditor
                        key={field.name}
                        control={control}
                        title={title}
                        editor={editor}
                        {...field}
                    />
                )
            }
        </div>
    )
}

export default memo(PropertiesGrid);
