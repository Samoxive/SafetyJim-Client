import * as React from "react";
import { Helmet } from "react-helmet";

type MetaTagProps = {
    title?: string;
    description?: string;
};

export const MetaTag = ({ title, description }: MetaTagProps) => (
    <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
    </Helmet>
);
