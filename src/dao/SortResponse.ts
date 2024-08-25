export interface SortResponseInterface {
    references:      string;
    link:            string;
    id:              string;
    long_url:        string;
    archived:        string;
    created_at:      string;
    custom_bitlinks: string[];
    tags:            string[];
    deeplinks:       Deeplink[];
}

export interface Deeplink {
    guid:         string;
    bitlink:      string;
    app_uri_path: string;
    install_url:  string;
    app_guid:     string;
    os:           string;
    install_type: string;
    created:      string;
    modified:     string;
    brand_guid:   string;
}

export interface SortResponseResultInterface {
    created_at:      string;
    id:              string;
    link:            string;
    custom_bitlinks: any[];
    long_url:        string;
    archived:        boolean;
    tags:            any[];
    deeplinks:       any[];
    references:      References;
}

export interface References {
    group: string;
}
