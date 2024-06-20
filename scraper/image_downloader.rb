require 'csv'
require 'open-uri'

BRANDS = [
  'rolex',
  'audemarspiguet',
  'breitling',
  'iwc',
  'jaegerlecoultre',
  'omega',
  'panerai',
  'patekphilippe',
  'cartier',
  'gucci',
  'seiko',
  'movado',
  'zenith'
]

BRANDS.each do |brand|
  begin
    data = CSV.read("data/#{brand}.txt")
  rescue Errno::ENOENT
    puts "File not found: data/#{brand}.txt"
    next
  rescue CSV::MalformedCSVError
    puts "Malformed CSV file: data/#{brand}.txt"
    next
  end

  data.each_with_index do |item, index|
    begin
      open(item[0]) do |image|
        File.open("images/#{brand}-#{index+1}-#{item[1]}.jpg", "wb") do |file|
          file.write(image.read)
        end
      end
    rescue OpenURI::HTTPError => e
      puts "Failed to download #{item[0]}: #{e.message}"
    rescue Errno::ENOENT, Errno::EACCES => e
      puts "File write error for #{brand}-#{index+1}-#{item[1]}.jpg: #{e.message}"
    end
  end
end
