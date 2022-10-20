import { gql } from "@apollo/client"
import client from "client"

const handler = async (req, res) => {
    try {
        const filters = JSON.parse(req.body)

        let hasParkingFilter = ``
        let petFriendlyFilter = ``
        let minPriceFilter = ``
        let maxPriceFilter = ``
        let minBedroomFilter = ``
        let maxBedroomFilter = ``


        if(filters.hasParking) {
            hasParkingFilter = `
            {
                key: "has_parking"
                compare: EQUAL_TO
                value: "1"
            },
            `
        }

        if(filters.petFriendly) {
            petFriendlyFilter = `
            {
                key: "pet_friendly"
                compare: EQUAL_TO
                value: "1"
            },
            `
        }

        if(filters.minPrice) {
            minPriceFilter = `
            {
                key: "price"
                compare: GREATER_THAN_OR_EQUAL_TO
                value: "${filters.minPrice}"
                type: NUMERIC
            },
            `
        }

        if(filters.maxPrice) {
            maxPriceFilter = `
            {
                key: "price"
                compare: LESS_THAN_OR_EQUAL_TO
                value: "${filters.maxPrice}"
                type: NUMERIC
            },
            `
        }

        if(filters.minBedroom) {
            minBedroomFilter = `
            {
                key: "bedrooms"
                compare: GREATER_THAN_OR_EQUAL_TO
                value: "${filters.minBedroom}"
                type: NUMERIC
            },
            `
        }

        if(filters.maxBedroom) {
            maxBedroomFilter = `
            {
                key: "bedrooms"
                compare: LESS_THAN_OR_EQUAL_TO
                value: "${filters.maxBedroom}"
                type: NUMERIC
            },
            `
        }

        const { data } = await client.query({
            query: gql`
                query AllPropertiesQuery {
                    properties(where: {offsetPagination: {size: 3, offset: ${((filters.page || 1) -1) * 3}}
                    metaQuery: {
                        relation: AND
                        metaArray: [
                            ${petFriendlyFilter}
                            ${hasParkingFilter}
                            ${minPriceFilter}
                            ${maxPriceFilter}
                            ${minBedroomFilter}
                            ${maxBedroomFilter}
                        ]
                        }
                        }) {
                        nodes {
                            databaseId
                            title
                            uri
                            featuredImage {
                                node {
                                uri
                                sourceUrl
                                }
                            }
                            propertyFeatures {
                                bathrooms
                                bedrooms
                                hasParking
                                petFriendly
                                price
                            }
                        }
                        pageInfo {
                            offsetPagination {
                                total
                            }
                        }
                    }
                }
            `
        });
        console.log("SERVER SIDE: ", data.properties.nodes);
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes
        })
    } catch(e) {
        console.log("ERROR: ", e)
    }
}

export default handler