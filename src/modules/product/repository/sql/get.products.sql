SELECT * FROM product
WHERE (name=${name} OR ${name} IS NULL)
AND (brand_name=${brand_name} OR ${brand_name} IS NULL);