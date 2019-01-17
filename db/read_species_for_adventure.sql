SELECT s.name, s.scientific_name, s.image_url, s.description, s.id FROM species s 
JOIN line_items li ON s.id = li.species_id
JOIN adventures a ON li.adventure_id = a.id
WHERE a.id = $1;