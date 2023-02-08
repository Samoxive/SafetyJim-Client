import * as React from "react";
import { Helmet } from "react-helmet-async";

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
